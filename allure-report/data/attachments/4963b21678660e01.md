# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - alert [ref=e4]: Please login to continue.
    - img "accor-logo" [ref=e7]
    - generic [ref=e8]:
      - img "accor-logo-2" [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e14]:
            - generic [ref=e15]: Email
            - textbox "Email" [ref=e17]
          - generic [ref=e18]:
            - generic [ref=e19]: "Password:"
            - textbox [ref=e20]
          - button "Log in" [ref=e21] [cursor=pointer]
        - generic [ref=e22]:
          - link "Forgot your password ?" [ref=e23] [cursor=pointer]:
            - /url: /users/forgot_password
          - link "Don’t have a password yet ?" [ref=e24] [cursor=pointer]:
            - /url: /users/forgot_password
        - generic [ref=e25]:
          - paragraph [ref=e26]: Do you have an Astore Connect Account ?
          - button "a-entry-logo Connect with Astore Connect" [ref=e27] [cursor=pointer]:
            - img "a-entry-logo" [ref=e28]
            - generic [ref=e29]: Connect with Astore Connect
  - iframe [ref=e30]:
    - button "Help" [ref=f1e4] [cursor=pointer]:
      - img [ref=f1e6]
      - generic [ref=f1e13]: Help
```