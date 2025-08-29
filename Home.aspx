<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.Home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="styles/home.css" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="home" runat="server">
    <section class="home-section-left">
        <!--Main body-->
        <article class="home-section-left-article" id="article-about">
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
        <article class="home-section-left-article" id="article-skills">
            <h2 class="home-section-left-h2-about-me">Skills</h2>
            <br />
            <p class="home-section-left-p-about-me-description">
                I am a web developer with a passion for creating dynamic and responsive websites. I specialize in HTML, CSS, JavaScript, and .NET technologies.
            </p>
        </article>
        <article class="home-section-left-article" id="article-education">
            <h2 class="home-section-left-h2-about-me">Education</h2>
            <br />
            <p class="home-section-left-p-description">
                When I’m not coding, I love exploring design trends, writing blogs, and 
        occasionally gaming to recharge my creativity.
            </p>
        </article>
        <article class="home-section-left-article" id="article-contact">
            <h2 class="home-section-left-h2-about-me">Contact Me</h2>
            <br />
            <p class="home-section-left-p-description">
                My journey started with curiosity about how websites work, and now I focus on 
        creating clean, responsive, and user-friendly web applications. I enjoy solving 
        problems, learning new technologies, and sharing knowledge with others.
            </p>
        </article>
        <!--Side navigation bar-->
        <aside class="home-section-left-aside-sidebar">
            <nav class="home-section-left-aside-sidebar-nav">
                <ul class="home-section-left-aside-sidebar-nav-ul">
                    <li class="home-section-left-aside-sidebar-nav-ul-li-tab selected" data-target="article-about">
                        <hr />
                        <a href="#">About</a></li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-tab" data-target="article-skills">
                        <hr />
                        <a href="#">Skills</a></li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-tab" data-target="article-education">
                        <hr />
                        <a href="#">Education</a></li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-tab" data-target="article-contact">
                        <hr />
                        <a href="#">Contact</a></li>
                </ul>
                <ul class="home-section-left-aside-sidebar-nav-ul">
                    <li class="home-section-left-aside-sidebar-nav-ul-li-icon" data-info="github">
                        <i class="fa-brands fa-github"></i>
                    </li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-icon" data-info="linkedin">
                        <i class="fa-brands fa-linkedin"></i>
                    </li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-icon" data-info="facebook">
                        <i class="fa-brands fa-square-facebook"></i>
                    </li>
                    <li class="home-section-left-aside-sidebar-nav-ul-li-icon" data-info="instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </li>
                </ul>
            </nav>
        </aside>
    </section>
    <section class="home-section-right">
        <img class="home-section-right-img" src="images/zunaied-01.jpg" />
    </section>
    <!--JavaScript-->
    <script src="scripts/home.js"></script>
</asp:Content>
