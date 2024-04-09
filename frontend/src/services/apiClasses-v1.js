import supabase from "./supabase";

export async function getClasses() {
  const { data, error } = await supabase.from("classes").select("*");

  if (error) {
    console.error(error);
    throw new Error("Classes could not be loaded");
  }

  console.log(data);

  return data;
}

export async function createClass(newClass) {
  const { data, error } = await supabase
    .from("classes")
    .insert([newClass])
    .select();

  if (error) {
    throw new Error("Class could not be created");
  }

  return data;
}

export async function deleteClass(id) {
  const { data, error } = await supabase.from("classes").delete().eq("id", id);

  if (error) {
    // console.error(error);
    throw new Error("Class could not be deleted");
  }

  return data;
}
