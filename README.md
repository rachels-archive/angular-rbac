# Angular RBAC (Role-Based Access Control)

Angular RBAC is a simple Angular application that demonstrates Role-Based Access Control (RBAC) functionality. It allows users to log in with different roles and access different parts of the application based on their assigned roles.

## Features

- **Authentication**: Users can register, login, and logout with email/password credentials. 
- **Role-Based Access Control (RBAC)**: Different parts of the application are accessible based on user roles (e.g., admin, user).
- **Registration with Validation**: Registration form includes validation for required fields and password strength.
- **Login with Validation**: Login form includes validation for required fields and proper authentication.
- **Admin Dashboard**: Administrators have access to an admin dashboard that displays a list of all users and their details.

## Concepts: Angular Auth Guard

**Angular Auth Guard** is a mechanism used to control access to routes in an Angular application based on certain conditions. It is utilized to enforce Role-Based Access Control (RBAC) as following:

- Authentication: Angular Auth Guard verifies the identity of users attempting to access specific routes.
- Authorization: It determines whether a user has the necessary roles and permissions to access the requested route.
- Implementation: The provided Auth Guard intercepts navigation requests and checks whether the user's role matches the roles allowed for the requested route.
- Error Handling: In case of unauthorized access attempts, the Auth Guard redirects the user to a designated error page or presents a message indicating access denial.

## Usage

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/rachels-archive/angular-rbac.git
   ```

2. **Install Dependencies:** Navigate into the project directory and install the dependencies using npm:

   ```bash
   cd angular-rbac
   npm install
   ```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.
