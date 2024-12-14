export const PASWORD_VALIDATION ={
    required: "Password is required",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  }
  
  export const EMAIL_VALIDATION ={
    
    required: "Email is required",
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "Invalid email address",
    },
  
}