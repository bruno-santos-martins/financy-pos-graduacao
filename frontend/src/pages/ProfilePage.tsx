import { Layout } from '@/shared/components/Layout';
import { ProfileForm } from '@/features/profile/components/ProfileForm';

export function ProfilePage() {
  return (
    <Layout>
      <div className="profile-page-container">
        <ProfileForm />
      </div>
    </Layout>
  );
}
