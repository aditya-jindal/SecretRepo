import supabase from "./supabase";

export async function putScore({
  name,
  email,
  score,
  college,
  timeTaken,
}) {
  const { data, error } = await supabase
    .from("Scores")
    .insert([
      {
        name: name,
        email: email,
        score: score,
        college: college,
        timeTaken: timeTaken,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Data could not be submitted!!");
  }
  return data;
}
