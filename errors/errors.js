module.exports.signInError = (err) => {
  let errors = {
    name: "",
    email: "",
    password:""
  }
  if (err.message.includes('name')) errors.name = "le champ name est obligatoire ou dejas pris"
  if (err.message.includes('email')) errors.email = "le champ email est obligatoire ou dejas pris"
  if (err.message.includes('password')) errors.password = "le champ password est obligatoire ou dejas pris"
  return errors
}