
import React, { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { GeneralSettingsForm } from "@/components/settings/GeneralSettingsForm";
import { NotificationSettingsForm } from "@/components/settings/NotificationSettingsForm";
import { SecuritySettingsForm } from "@/components/settings/SecuritySettingsForm";

const Settings = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-600 mt-2">Customize your experience and manage your profile</p>
              </div>

              {/* Profile Settings */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                </div>
                <ProfileForm profile={profile} onProfileUpdate={fetchProfile} />
              </div>

              {/* General Settings */}
              <GeneralSettingsForm />

              {/* Notification Settings */}
              <NotificationSettingsForm />

              {/* Security Settings */}
              <SecuritySettingsForm />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
