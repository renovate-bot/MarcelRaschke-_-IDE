using System;
using System.Collections.Generic;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;
$endif$using System.Web;
using System.Web.Services;

/// <summary>
/// Zusammenfassungsbeschreibung für $codebehindclassname$
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
$if$ ($targetframeworkversion$ >= 3.5)// Wenn der Aufruf dieses Webdiensts aus einem Skript zulässig sein soll, heben Sie mithilfe von ASP.NET AJAX die Kommentarmarkierung für die folgende Zeile auf. 
// [System.Web.Script.Services.ScriptService]
$endif$public class $codebehindclassname$ : System.Web.Services.WebService {

    public $codebehindclassname$ () {

        //Heben Sie die Kommentarmarkierung für die folgende Zeile auf, wenn Designkomponenten verwendet werden 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    
}
