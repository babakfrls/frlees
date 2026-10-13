package com.frlees.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private static final String LOCAL = "file:///android_asset/index.html";
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setUserAgentString(s.getUserAgentString() + " frleesApp");
        web.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                String u = r.getUrl().toString();
                String site = BuildConfig.SITE_URL;
                if (u.startsWith("file:") || (!site.isEmpty() && u.startsWith(site))) return false;
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(u)));
                return true;
            }
            @Override
            public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (r.isForMainFrame() && !LOCAL.equals(v.getUrl())) v.loadUrl(LOCAL);
            }
        });
        setContentView(web);
        String site = BuildConfig.SITE_URL;
        web.loadUrl(site.isEmpty() ? LOCAL : site);
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript(
            "(function(){var g=document.getElementById('game');if(g&&g.classList.contains('on')){show('home');return 1}return 0})()",
            v -> { if (!"1".equals(v)) MainActivity.super.onBackPressed(); });
    }
}
