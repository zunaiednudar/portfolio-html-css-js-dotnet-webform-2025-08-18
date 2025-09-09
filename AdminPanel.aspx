<%@ Page Title="AdminPanel" Language="C#" AutoEventWireup="true" CodeBehind="AdminPanel.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.AdminPanel" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <!--<link rel="stylesheet" href="styles/admin.css" type="text/css" />-->
    <title>Admin Panel</title>
</head>
<body>
    <form id="form1" runat="server">
        <h2>Welcome, Zunaied!</h2>

        <asp:Repeater ID="rptTables" runat="server" OnItemDataBound="rptTables_ItemDataBound">
            <ItemTemplate>
                <div class="table-section" style="margin-bottom: 40px;">
                    <h3><%# Eval("TABLE_NAME") %></h3>

                    <!-- Add Button -->
                    <asp:Button ID="btnAdd" runat="server" Text="Add New"
                        CommandName="Add" CommandArgument='<%# Eval("TABLE_NAME") %>'
                        OnCommand="btnAdd_Command" CssClass="btn-add" />

                    <!-- GridView for table rows -->
                    <asp:GridView ID="gvTable" runat="server"
                        AutoGenerateColumns="true"
                        CssClass="grid"
                        OnRowCommand="gvTable_RowCommand">
                        
                        <Columns>
                            <asp:TemplateField HeaderText="Actions">
                                <ItemTemplate>
                                    <asp:LinkButton ID="lnkUpdate" runat="server" CommandName="UpdateRow">
                                        Update
                                    </asp:LinkButton>
                                    |
                                    <asp:LinkButton ID="lnkDelete" runat="server" CommandName="DeleteRow"
                                        OnClientClick="return confirm('Are you sure you want to delete this record?');">
                                        Delete
                                    </asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
            </ItemTemplate>
        </asp:Repeater>
    </form>
</body>
</html>
