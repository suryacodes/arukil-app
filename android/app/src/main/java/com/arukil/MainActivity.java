package com.arukil;
import android.os.Bundle; // here

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "arukil";
  }
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
}
