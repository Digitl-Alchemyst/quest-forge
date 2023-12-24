import { Client, Account } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('<YOUR_PROJECT_ID>'); // Replace with your project ID

const account = new Account(client);

export async function signUp(email: string, password: string, name: string) {
  // Validate email address
  function validateEmail(email: string): boolean {
    // Use a regex or library to validate email format
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Validate password
  function validatePassword(password: string): boolean {
    // Check minimum length, complexity requirements
    return password.length >= 8;
  }

  // Validate email
  if (!validateEmail(email)) {
    throw new Error("Invalid email");
  }

  // Validate password
  if (!validatePassword(password)) {
    throw new Error("Invalid password");
  }

  try {
    let response = await account.create(email, password, name);
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function logIn() {
  try {
    let response = await account.getSession("current");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}



export async function logOut() {
  try {
      let response = await account.deleteSession('current');
      console.log(response);
  } catch (error) {
      console.error(error);
  }
}
