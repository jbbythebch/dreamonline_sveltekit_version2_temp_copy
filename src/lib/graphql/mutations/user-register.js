export const mutationUserRegister = `
  mutation ($email: String!, $password: String!, $localeCode: String) {
    userRegister(
      authProviderInput: {
            email: $email,
            password: $password,
            localeCode: $localeCode
      }
    )
      {
      id
      email
    }
  }	
`;
