import { supabase } from './supabaseClient';
import { sessionManager } from './supabaseClient';

/**
 * Sign in user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data, error}>} Authentication result
 */
export async function signIn(email, password) {
  try {
    // Clear any existing session data before login
    sessionManager.clearAllAuthData();

    // Perform login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return { data: null, error };
    }

    // Optional: Store minimal user info in session storage
    if (data?.user) {
      try {
        sessionStorage.setItem('user_email', data.user.email);
        sessionStorage.setItem('user_id', data.user.id);
      } catch (storageError) {
        console.error('Error storing user data:', storageError);
      }
    }

    return { data, error: null };
  } catch (unexpectedError) {
    console.error('Unexpected login error:', unexpectedError);
    return { data: null, error: unexpectedError };
  }
}

/**
 * Sign up user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User's full name
 * @param {string} companyName - User's company name
 * @returns {Promise<{data, error}>} Registration result
 */
export async function signUp(email, password, fullName, companyName) {
  try {
    // Clear any existing session data before registration
    sessionManager.clearAllAuthData();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName
        }
      }
    });

    if (error) {
      console.error('Registration error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return { data: null, error };
    }

    return { data, error: null };
  } catch (unexpectedError) {
    console.error('Unexpected registration error:', unexpectedError);
    return { data: null, error: unexpectedError };
  }
}

/**
 * Sign out user
 * @returns {Promise<{error}>} Logout result
 */
export async function signOut() {
  try {
    // Use session manager to clear all auth data
    sessionManager.clearAllAuthData();
    return { error: null };
  } catch (error) {
    console.error('Logout error:', error);
    return { error };
  }
}

/**
 * Get current authenticated user
 * @returns {Promise<{data, error}>} User data
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Get current user error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return { data: null, error };
    }

    return { data: data.user, error: null };
  } catch (unexpectedError) {
    console.error('Unexpected get user error:', unexpectedError);
    return { data: null, error: unexpectedError };
  }
}

/**
 * Get current session
 * @returns {Promise<{data, error}>} Session data
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return { data: null, error };
    }

    return { data: data.session, error: null };
  } catch (unexpectedError) {
    console.error('Unexpected get session error:', unexpectedError);
    return { data: null, error: unexpectedError };
  }
}

/**
 * Check and refresh session
 * @returns {Promise<{session, user}>} Current session
 */
export async function checkAndRefreshSession() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Session check error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return null;
    }

    return data.session;
  } catch (unexpectedError) {
    console.error('Unexpected session check error:', unexpectedError);
    return null;
  }
}

/**
 * Update the current user's profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<{data, error}>} Supabase response
 */
export async function updateProfile(profileData) {
  try {
    // First get current user
    const user = await getCurrentUser();
    if (!user) return { error: { message: 'Not authenticated' } };
    
    // Update auth metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: profileData
    });
    
    if (metadataError) return { error: metadataError };
    
    // Update profile in users table
    const { data, error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', user.id)
      .select()
      .single();
      
    return { data, error };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error };
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<{data, error}>} Supabase response
 */
export async function resetPassword(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      console.error('Password reset request error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    }

    return { data, error };
  } catch (error) {
    console.error('Unexpected error in resetPassword:', error);
    return { error };
  }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<{data, error}>} Supabase response
 */
export async function updatePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('Password update error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    }

    return { data, error };
  } catch (error) {
    console.error('Unexpected error in updatePassword:', error);
    return { error };
  }
}

/**
 * Complete user registration with all form data
 * @param {Object} formData - Complete registration form data
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function completeRegistration(formData) {
  try {
    // Clear any existing session storage data first
    sessionStorage.removeItem('pendingRegistration');
    sessionStorage.removeItem('registration_complete');
    
    // Step 1: Create auth user (this is required for Supabase auth)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          company_name: formData.companyName,
          phone: formData.phone,
          profession: formData.profession,
          country: formData.country,
          business_size: formData.businessSize,
          selected_plan: formData.selectedPlan
        }
      }
    });

    if (authError) {
      return { error: authError };
    }

    // Step 2: Create user record in public.users table immediately
    if (authData?.user) {
      // Calculate trial end date (14 days from now)
      const trialStartDate = new Date();
      const trialEndDate = new Date(trialStartDate.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 days

      const userRecord = {
        id: authData.user.id,
        email: formData.email,
        full_name: formData.fullName,
        company_name: formData.companyName,
        phone: formData.phone,
        profession: formData.profession,
        country: formData.country,
        business_size: formData.businessSize,
        selected_plan: formData.selectedPlan,
        subscription_status: 'trial',
        trial_start_date: trialStartDate.toISOString(),
        trial_end_date: trialEndDate.toISOString(),
        stripe_customer_id: null,
        stripe_subscription_id: null
      };

      // Create user record in public.users table
      const { error: userError } = await supabase
        .from('users')
        .upsert(userRecord, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (userError) {
        console.error('Error creating user record:', userError);
        return { error: userError };
      }

      // Store registration data in sessionStorage for after payment
      const registrationData = {
        userId: authData.user.id,
        email: formData.email,
        fullName: formData.fullName,
        companyName: formData.companyName,
        phone: formData.phone,
        profession: formData.profession,
        country: formData.country,
        businessSize: formData.businessSize,
        selectedPlan: formData.selectedPlan,
        registrationComplete: true
      };
      
      sessionStorage.setItem('pendingRegistration', JSON.stringify(registrationData));
    }

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error in complete registration:', error);
    return { error };
  }
}

/**
 * Update user subscription data after successful payment
 * @param {string} userId - User ID
 * @param {object} userData - User data from registration
 * @returns {Promise<{data, error}>} Result
 */
export async function createUserAfterPayment(userId, userData) {
  try {
    // Update subscription status and related fields after payment
    const updateData = {
      subscription_status: 'active', // Change from 'trial' to 'active'
      // Note: stripe_customer_id and stripe_subscription_id will be updated by webhook
    };

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user subscription after payment:', error);
      return { error };
    }

    // Clear the pending registration data
    sessionStorage.removeItem('pendingRegistration');
    
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user after payment:', error);
    return { error };
  }
}

/**
 * Check if user is in trial period
 * @param {string} userId - User ID
 * @returns {Promise<{data, error}>} Trial status
 */
export async function checkTrialStatus(userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('trial_start_date, trial_end_date, subscription_status')
      .eq('id', userId)
      .single();

    if (error) return { error };

    if (data.subscription_status === 'trial') {
      const now = new Date();
      const trialEnd = new Date(data.trial_end_date);
      
      if (now > trialEnd) {
        // Trial expired, update status
        await supabase
          .from('users')
          .update({ subscription_status: 'expired' })
          .eq('id', userId);
        
        return { data: { isTrialActive: false, trialExpired: true } };
      }
      
      return { data: { isTrialActive: true, trialExpired: false } };
    }

    return { data: { isTrialActive: false, trialExpired: false } };
  } catch (error) {
    console.error('Error checking trial status:', error);
    return { error };
  }
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function for auth state changes
 * @returns {Object} Subscription data
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    // Log auth state changes for debugging
    
    // Call provided callback
    callback(session, event);
  });
} 