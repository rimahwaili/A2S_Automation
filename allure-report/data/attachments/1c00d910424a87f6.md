# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - alert [ref=e4]: Wrong Email or Password.
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
        - generic [ref=e22]: Wrong Email or Password.
        - generic [ref=e23]:
          - link "Forgot your password ?" [ref=e24] [cursor=pointer]:
            - /url: /users/forgot_password
          - link "Don’t have a password yet ?" [ref=e25] [cursor=pointer]:
            - /url: /users/forgot_password
        - generic [ref=e26]:
          - paragraph [ref=e27]: Do you have an Astore Connect Account ?
          - button "a-entry-logo Connect with Astore Connect" [ref=e28] [cursor=pointer]:
            - img "a-entry-logo" [ref=e29]
            - generic [ref=e30]: Connect with Astore Connect
  - iframe [ref=e31]:
    - button "Help" [ref=f1e4] [cursor=pointer]:
      - img [ref=f1e6]
      - generic [ref=f1e13]: Help
```