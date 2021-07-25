const defaultStrings = {
    Loader_Sign_In: 'Signing in...',
    LoaderCreatingAccount: 'Creating account...',
    LoaderValidatingAccount: 'Validating account details...',
    LoaderUpdatingAccount: 'Updating your account...',
    LoaderLogOut: 'Logging you out...',

    defaultImage: 'https://storage.googleapis.com/cdn.bublenet.com/assets/avatar64x64.png',

    // SignupContainer
    Signup_FirstNameValidation: 'Enter First Name',
    Signup_LastNameValidation: 'Enter Last Name',
    Signup_EmailValidation: 'Enter Email Id',
    Signup_ValidEmailValidation: 'Enter Valid Email Id',
    Signup_PasswordValidation: 'Password must be minimum 8 characters and should contain a special character, capital letter and a number.',
    Signup_VaildPasswordRegexValidation: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\]*)(?=.{8,})',

    //SignupScreenView
    Signup_FIRST_NAME_Placeholder: 'First Name',
    Signup_LAST_NAME_Placeholder: 'Last Name',
    Signup_EMAIL_PLACEHOLDER: 'Email',
    Signup_PASSWORD_PLACEHOLDER: 'Password',
    Signup_SIGNUP_BUTTON: 'SIGN UP',
    Signup_SignUpAgree: 'By tapping Signup, you agree to the consent to receive electronic disclosures and understand that we`ll send account notices to the email address provided.',
    Signup_TermsConditionsTitle: 'Terms & Conditions',
    Signup_SignUpAgreeEnd: ' mentioned.',
    Signup_PasswordLengthValidation: 'Minimum password length is 8',
    Signup_Please_Enter_Valid_Email: 'Please Enter Valid Email',
    SignIn_Please_Enter_Valid_Password: 'Please Enter Valid Password',

    //SignInContainer
    SignIn_Something_went_wrong_obtaining_the_users_access_token: 'Something went wrong with the signin process, please retry.',
    SignIn_MaximumFailureAttempts: 'You have reached maximum number of attempts, please try again after 30 minutes or reset your password.',
    SignIn_MaximumFailureAttemptsCount: '5',
    SignIn_MaximumFailureTimeLimit: '1800000',

    //SignInScreenView
    SignIn_EmailPlaceHolder: 'Email',
    SignIn_PasswordPlaceHolder: 'Password',
    SignIn_LoginButton: 'SIGN IN',
    SignIn_ForgotPassword: 'Forgot your password?',

    //SettingsContainer
    Settings_LogoutAlert: 'Are you sure you want to logout?',

    //SettingsScreenView
    Settings_Account: 'ACCOUNT',
    Settings_Profile: 'PROFILE',
    Settings_PersonalDetails: 'PERSONAL DETAILS',
    Settings_Security: 'SECURITY',
    Settings_ChangePassword: 'CHANGE PASSWORD',
    Settings_ChangeMobileNumber: 'CHANGE MOBILE NUMBER',
    Settings_Logout: 'LOGOUT',
    Settings_VersionNumber: 'VERSION',
    Settings_ChangeEmail: 'CHANGE EMAIL',
    Settings_FAQ: 'FAQ`s',
    Settings_Rewards: 'REWARDS',
    Settings_Terms_And_Conditions: 'TERMS AND CONDITIONS',
    Settings_Privacy_Policy: 'PRIVACY POLICY',
    Settings_Contact_Us: 'CONTACT US',
    Settings_Help: 'HELP',
    Settings_Preferences: 'PREFERENCES',
}

export var strings = { ...defaultStrings };