import { account, databases, DATABASE_ID, COLLECTIONS } from './appwrite';
import { ID } from 'appwrite';
import type { Models } from 'appwrite';

export type AppwriteUser = Models.User<Models.Preferences>;

// Sign up new user
export async function signUp(email: string, password: string, name: string) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    
    // Create user profile in database
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      ID.unique(),
      {
        user_id: user.$id,
        email: user.email,
        display_name: name,
        purchased_releases: [],
        favorites: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    );
    
    // Automatically sign in after signup
    await signIn(email, password);
    
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// Sign in existing user
export async function signIn(email: string, password: string) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

// Sign out current user
export async function signOut() {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Get current user
export async function getCurrentUser(): Promise<AppwriteUser | null> {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

// Get user profile from database
export async function getUserProfile(userId: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [`user_id=${userId}`]
    );
    return response.documents.length > 0 ? response.documents[0] : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(documentId: string, data: Partial<{
  display_name: string;
  purchased_releases: string[];
  favorites: string[];
}>) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      documentId,
      {
        ...data,
        updated_at: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Add release to favorites
export async function addToFavorites(documentId: string, releaseId: string, currentFavorites: string[]) {
  try {
    const updatedFavorites = [...currentFavorites, releaseId];
    return await updateUserProfile(documentId, { favorites: updatedFavorites });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
}

// Remove release from favorites
export async function removeFromFavorites(documentId: string, releaseId: string, currentFavorites: string[]) {
  try {
    const updatedFavorites = currentFavorites.filter(id => id !== releaseId);
    return await updateUserProfile(documentId, { favorites: updatedFavorites });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
}

// Check if user has purchased a release
export async function hasPurchasedRelease(userId: string, releaseId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) return false;
    return profile.purchased_releases?.includes(releaseId) || false;
  } catch (error) {
    console.error('Error checking purchase:', error);
    return false;
  }
}

// Password reset
export async function sendPasswordResetEmail(email: string) {
  try {
    const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password`;
    return await account.createRecovery(email, redirectUrl);
  } catch (error) {
    console.error('Error sending password reset:', error);
    throw error;
  }
}

// Complete password reset
export async function resetPassword(userId: string, secret: string, password: string) {
  try {
    return await account.updateRecovery(userId, secret, password);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

// Email verification
export async function sendVerificationEmail() {
  try {
    const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email`;
    return await account.createVerification(redirectUrl);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

// Confirm email verification
export async function verifyEmail(userId: string, secret: string) {
  try {
    return await account.updateVerification(userId, secret);
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}
