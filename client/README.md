# SplitWiseClient
🛠 Project Overview
This project is a simplified Expense Sharing Application (inspired by Splitwise). The goal is to allow users to manage group expenses, track who owes what, and maintain their personal profiles.

We are looking for a developer who can transform these functional requirements into a seamless, intuitive, and high-quality user experience. There are no Figma files provided—we want to see your creativity and your eye for modern UI/UX design.

🚀 Key Features
1. Dynamic Authentication & Navigation
The Navbar is the heart of the app's navigation and must adapt based on the user's session state:

Guest State: A Navbar featuring a "User Icon" that triggers a modal/dialog containing Login, Register, and Forgot Password flows.

Authenticated State:

The Navbar displays "Hello, [Username]".

The User Icon now opens a dropdown/menu with:

"To My Account" (Link to /user)

"Logout" button.

A new "My Groups" button appears in the main navigation (Link to /group).

2. User Account Management (/user)
A dedicated space for users to manage their identity:

Profile Editing: Ability to update Username and Email.

Validation: Implementation of checks to ensure the new username/email aren't already taken.

Account Deletion: A "Trash Can" icon/button to delete the account (should include a confirmation step).

3. Group Management (/group)
The core hub for social expenses:

Creation: Users can create new groups.

Overview: View a list of groups the user owns or has been invited to.

Group Details: Every group card or page must display:

Group Name & Owner.

List of Members.

Full Expense History.

Live Balances: An updated calculation of "who owes whom" that re-runs the settlement algorithm every time a transaction is added.