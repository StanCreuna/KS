<%@ Page Language="C#" %>
    <%@ Import Namespace="System.Web.Security" %>
        <script runat="server">
            void Logon_Click(object sender, EventArgs e)
            {
                if (FormsAuthentication.Authenticate(UserName.Text, UserPass.Text)) {
                    FormsAuthentication.RedirectFromLoginPage
                        (UserName.Text, Persist.Checked);
                }
                else {
                    Msg.Text = "Invalid credentials. Please try again.";
                    // test line
                }
            }
        </script>
        <html>

        <head id="Head1" runat="server">
            <title>Login</title>
        </head>

        <body>
            <form id="form1" runat="server">
                <h3>
                    Logon Page</h3>
                <table>
                    <tr>
                        <td>
                            User name:</td>
                        <td>
                            <asp:TextBox ID="UserName" runat="server" />
                        </td>
                        <td>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="UserName" Display="Dynamic" ErrorMessage="Cannot be empty."
                                runat="server" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password:</td>
                        <td>
                            <asp:TextBox ID="UserPass" TextMode="Password" runat="server" />
                        </td>
                        <td>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="UserPass" ErrorMessage="Cannot be empty." runat="server"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Remember me?</td>
                        <td>
                            <asp:CheckBox ID="Persist" runat="server" />
                        </td>
                    </tr>
                </table>
                <asp:Button ID="Submit1" OnClick="Logon_Click" Text="Log On" runat="server" />
                <p>
                    <asp:Label ID="Msg" ForeColor="red" runat="server" />
                </p>
            </form>
        </body>

        </html>