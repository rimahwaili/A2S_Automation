# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - img "accor-logo" [ref=e6]
    - generic [ref=e7]:
      - img "accor-logo-2" [ref=e8]
      - heading "New Password" [level=2] [ref=e9]
      - paragraph [ref=e10]: "To receive a new password, please enter your email address. Within a few minutes you will receive an e-mail to create a new password. This can only work if you use the email associated with your AstoreSuite account. If necessary, do not hesitate to contact us via the address: support@astoreprocurement.com."
      - generic [ref=e11]:
        - generic [ref=e12]:
          - text: Email
          - textbox "Email" [ref=e13]
        - button "Send me my password" [ref=e16] [cursor=pointer]
        - link "Return to login" [ref=e18] [cursor=pointer]:
          - /url: /users/login
  - iframe [ref=e19]:
    - button "Help" [ref=f1e4] [cursor=pointer]:
      - img [ref=f1e6]
      - generic [ref=f1e13]: Help
```