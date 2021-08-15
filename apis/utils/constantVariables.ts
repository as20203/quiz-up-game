export interface ConstantVariables {
  enums: {
    userTypesEnum: string[];
  };
  messages: {
    //Add Clients
    duplicateContactEmail: string;
    successfulLogin: string;
    NotAgreeToTerms: string;
    //client type
    invalidClientType: string;
    successfullRetrieval: string;
    successfulSave: string;
    //Email
    invalidEmail: string;

    //Password
    emptyPassword: string;
    whitespacePassword: string;
    whitespaceUsername: string;
    invalidPasswordLength: string;

    //Enum
    valueNotInEnum: string;

    //serial no
    invalidSerial: string;

    invalidCompanyName: string;
    ParsingError: string;
  };
}

export const constants: ConstantVariables = {
  enums: {
    userTypesEnum: ['admin', 'user']
  },
  messages: {
    //Add Clients
    duplicateContactEmail: 'Some of your contacts have same email.',
    successfulLogin: 'Successfully logged in.',
    NotAgreeToTerms: 'You did not agree to our terms.',
    //client type
    invalidClientType: 'Invalid client type provided.',
    successfullRetrieval: 'Retrieved successfully.',
    successfulSave: 'Record has been saved successfully.',
    //Email
    invalidEmail: 'You have entered an invalid email.',

    //Password
    emptyPassword: 'Password should not be empty or contain any empty space between characters.',
    whitespacePassword: 'Password should not contain any empty space between characters.',
    whitespaceUsername: 'Username should not contain any empty space between characters.',
    invalidPasswordLength: 'Password length must be between 8 and 20 characters.',
    //Enum
    valueNotInEnum: 'Provided value does not exist among the possible values.',

    //serial no
    invalidSerial: 'Invalid serial number provided.',
    //invalid
    invalidCompanyName: 'Company name must contain some alphabets.',
    ParsingError: `Couldn't parse the required information.`
  }
};
