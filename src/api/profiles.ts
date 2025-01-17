import { supabase } from "@/supabase/supabase";

const getProfile = async (userId: string) => {
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const profilesApi = { getProfile };
