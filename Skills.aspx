<%@ Page Title="Skills" Language="C#" AutoEventWireup="true" CodeBehind="Skills.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.Skills" %>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <!--Google Fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
    <!--CSS-->
    <link rel="stylesheet" href="styles/site.css" type="text/css" />
    <link rel="stylesheet" href="styles/skills.css" type="text/css" />
    <title>My Skills</title>
</head>
<body class="skills">
    <form id="form1" runat="server">
        <h2>My Skills</h2>
        <hr />
        <div class="skills-container">
            <asp:Repeater ID="rptSkillsCategories" runat="server" OnItemDataBound="rptSkillsCategories_ItemDataBound">
                <ItemTemplate>
                    <div class="skills-category">
                        <h3><%# Eval("CategoryName") %></h3>
                        <div class="skills-items">
                            <asp:Repeater ID="rptSkills" runat="server" OnItemDataBound="rptSkills_ItemDataBound">
                                <ItemTemplate>
                                    <div class="skill">
                                        <img src='<%# Eval("ImagePath") %>' />
                                        <!--<span><%# Eval("SkillName") %></span>-->
                                        <div class="skill-proficiency">
                                            <div id="skillBar" runat="server" class="skill-bar"></div>
                                        </div>
                                        <span class="skill-percent"><%# Eval("Proficiency") %>%</span>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </div>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
            <!--JavaScript-->
            <script src="scripts/skills.js"></script>
        </div>
    </form>
</body>
</html>
