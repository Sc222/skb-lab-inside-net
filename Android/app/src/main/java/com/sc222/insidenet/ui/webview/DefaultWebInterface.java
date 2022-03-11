package com.sc222.insidenet.ui.webview;

import android.content.Context;
import android.webkit.JavascriptInterface;

public class DefaultWebInterface {
    Context context;

    public DefaultWebInterface(Context c) {
        context = c;
    }

    @JavascriptInterface
    public void onRedirectedToLogin() {

    }

}
