
package com.$safeprojectname$;

import android.app.Activity;
import android.widget.TextView;
import android.os.Bundle;

public class $safeprojectname$ extends Activity
{
    /** Wird beim erstmaligen Erstellen der Aktivität aufgerufen. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        /* Erstellt eine "TextView" und legt ihren Text auf "Hello world" fest. */
        TextView  tv = new TextView(this);
        tv.setText("Hello World!");
        setContentView(tv);
    }
}
