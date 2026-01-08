# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - img "accor-logo" [ref=e5]
    - generic [ref=e6]:
      - img "accor-logo-2" [ref=e7]
      - generic [ref=e9]:
        - paragraph [ref=e10]: Choose your language
        - combobox [ref=e11]:
          - option "French" [selected]
          - option "English"
      - group [ref=e13]:
        - heading "Welcome to AstoreSuite" [level=2] [ref=e14]
        - paragraph [ref=e15]: In order to connect to Astore Suite, please set-up a password and accept the general terms and conditions of use.
        - generic [ref=e16]:
          - paragraph [ref=e17]: "Password must contains at least 3 of the 4 following characters category :"
          - list [ref=e18]:
            - listitem [ref=e19]: uppercase characters (A-Z)
            - listitem [ref=e20]: lowercase characters (a-z)
            - listitem [ref=e21]: numbers (0-9)
            - listitem [ref=e22]: special characters ($*+/£μ% ...)
        - generic [ref=e23]:
          - text: "Password:"
          - textbox "Password:" [ref=e24]
        - generic [ref=e25]:
          - text: "Password Confirmation:"
          - textbox "Password Confirmation:" [ref=e26]
        - paragraph [ref=e27]:
          - text: By clicking accept, you agree Accor's
          - link "general terms and conditions of use" [ref=e28] [cursor=pointer]:
            - /url: /documentations/display_cgu?from_login=true
        - button "Accept" [ref=e30] [cursor=pointer]
  - iframe [ref=e31]:
    - button "Help" [ref=f1e4] [cursor=pointer]:
      - img [ref=f1e6]
      - generic [ref=f1e13]: Help
```