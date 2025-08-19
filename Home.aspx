<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.Home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="styles/home.css" type="text/css" />
</asp:Content>
<asp:Content ID="mainContent" ContentPlaceHolderID="home" runat="server">
    <section class="home-section-left">
        <!--Main body-->
        <article class="home-section-left-article-about">
            <h2 class="home-section-left-h2-about-me">About Me</h2>
            <br />
            <p class="home-section-left-p-about-me-description">
                I am a web developer with a passion for creating dynamic and responsive websites. I specialize in HTML, CSS, JavaScript, and .NET technologies.
            </p>
            <br />
            <p class="home-section-left-p-description">
                My journey started with curiosity about how websites work, and now I focus on 
        creating clean, responsive, and user-friendly web applications. I enjoy solving 
        problems, learning new technologies, and sharing knowledge with others.
            </p>
            <br />
            <p class="home-section-left-p-description">
                When I’m not coding, I love exploring design trends, writing blogs, and 
        occasionally gaming to recharge my creativity.
            </p>
        </article>
        <!--Side navigation bar-->
        <aside class="home-section-left-aside-sidebar">
            <nav class="home-section-left-aside-sidebar-nav">
                <ul class="home-section-left-aside-sidebar-nav-ul">
                    <li class="home-section-left-aside-sidebar-nav-ul-li">
                        <hr />
                        <a href="#">About</a></li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li">
                        <hr />
                        <a href="#">Skills</a></li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li">
                        <hr />
                        <a href="#">Contact</a></li>
                </ul>
            </nav>
        </aside>
    </section>
    <section class="home-section-right">
        <img class="home-section-right-img" src="images/zunaied-01.jpg" />
    </section>
</asp:Content>
