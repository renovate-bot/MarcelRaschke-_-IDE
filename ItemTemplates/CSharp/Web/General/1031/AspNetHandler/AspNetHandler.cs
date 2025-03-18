using System;
using System.Web;

namespace $rootnamespace$
{
    public class  $safeitemrootname$ : IHttpHandler
    {
        /// <summary>
        /// Sie müssen diesen Handler in der Datei "Web.config" Ihres 
        /// Webs konfigurieren und bei IIS registrieren, bevor Sie ihn verwenden können. Weitere Informationen
        /// finden Sie unter https://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler-Elemente

        public bool IsReusable
        {
            // "false" zurückgeben, wenn der verwaltete Handler nicht für eine andere Anforderung erneut verwendet werden kann.
            // Normalerweise ist dieser Wert "false", wenn Statusinformationen pro Anforderung gespeichert wurden.
            get { return true; } 
        }

        public void ProcessRequest(HttpContext context)
        {
            //Handlerimplementierung hier einfügen.
        }

        #endregion
    }
}
