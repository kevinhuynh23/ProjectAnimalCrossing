# ProjectNintendoSwitch aka ProjectAnimalCrossing

____

## Dependency

- [NodeJS](https://nodejs.org/en/download/)
- AWS Account
- AWS Simple Email Service (SES)
- [AWS CLI Version 1](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)

## Instruction

1. Clone the repository and cd into project

2. Install node packages

    ```bash
    npm install
    ```

3. Update the necessary fields:
3.1. **sourceEmailAddr** = The email address the reciever will see
3.2. **destinationEmailAddrs** = The email addresses that will be notified

4. In AWS SES, verify all the e-mail addresses added to the fields above in the **Email Addresses** section

5. Run the NodeJS server

    ```bash
    node index.js
    ```

## Important Notes

- **Cookie** only needs to be filled in if you need in-store pickup
- In the **Cookie**, the "customerZipCode=xxxxx" section is needed to help the website know where are you located, so that the availability for local store pick up can be checked.
