Imports System.Web
Public Class $safeitemrootname$
    Implements IHttpHandler

    ''' <summary>
    '''  Sie müssen diesen Handler in der Datei "Web.config" Ihres 
    '''  Webs konfigurieren und bei IIS registrieren, bevor Sie ihn verwenden können. Weitere Informationen
    '''  finden Sie unter https://go.microsoft.com/?linkid=8101007
    ''' </summary>
#Region "IHttpHandler-Elemente"

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            ' "false" zurückgeben, wenn der verwaltete Handler nicht für eine andere Anforderung erneut verwendet werden kann.
            ' Normalerweise ist dieser Wert "false", wenn Statusinformationen pro Anforderung gespeichert wurden.
            Return True
        End Get
    End Property

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        ' Handlerimplementierung hier einfügen.

    End Sub

#End Region

End Class
