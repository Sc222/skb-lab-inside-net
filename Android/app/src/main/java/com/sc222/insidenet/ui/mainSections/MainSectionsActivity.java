package com.sc222.insidenet.ui.mainSections;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityMainSectionsBinding;
import com.sc222.insidenet.ui.webview.constants.UrlConstants;

import java.util.Optional;

public class MainSectionsActivity extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener {
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Toast.makeText(getApplicationContext(), "WEBVIEW NAVIGATE TO: " + item.getItemId(), Toast.LENGTH_SHORT).show();
        return true;
    }

    //TODO: GLOBAL PROJECT (see below)
    // - CALENDAR
    // - better UI on mobile (smaller margins, smaller avatars)
    // - register \ settings pages (optional)

    //TODO: ANDROID: (see below)
    // - track active url and update navigationBar
    // - change webView url using navigationBar
    // - progressBar while loading pages
    // - add possibility to update page using Swipe-to-Refresh (optional)
    // - !!! HIDE BOTTOM NAV IF NOT LOGGED IN (inject android logic using )
    //

    //FIXME: CRITICAL
    // website crashes on emulators (idk, try connecting to production build)

    private class DefaultWebClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            if (UrlConstants.WEB_VIEW_URL.equals(request.getUrl().getHost())) {
                // This is my website, so do not override; let my WebView load the page
                return false;
            }

            // Toast.makeText(getApplicationContext(), "URL CHANGE: "+request.getUrl().getPath(),Toast.LENGTH_LONG).show();

            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
            startActivity(intent);
            return true;
        }

        @Override
        public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
            super.doUpdateVisitedHistory(view, url, isReload);

            //view.getUrl()

            if (url.endsWith("login")) {
                Toast.makeText(getApplicationContext(), "ОБРАБОТАТЬ ЛОГИН", Toast.LENGTH_LONG).show();
                //TODO: hide navigation here
            } else if (url.contains("profile")) { //TODO: use regexp here
                //show navigation here
                Toast.makeText(getApplicationContext(), "ОБРАБОТАТЬ СТРАНИЦУ ПРОФИЛЯ", Toast.LENGTH_LONG).show();
            }


        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            Toast.makeText(getApplicationContext(), "LOADING STARTED", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            //Toast.makeText(getApplicationContext(), "LOADING FINISHED: "+url, Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            String errorMessage = "Unexpected error";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                errorMessage = error.getDescription().toString();
            }
            //Your code to do
            Toast.makeText(getApplicationContext(), errorMessage, Toast.LENGTH_LONG).show();
        }
    }


    private ActivityMainSectionsBinding binding;
    //private NavController navController;

    @Override
    public void onBackPressed() {
        /*if (Objects.requireNonNull(navController.getCurrentDestination()).getId() == R.id.profileFragment)
            this.finishAffinity();
        else
            super.onBackPressed();*/
        //TODO: CLOSE APP
        super.onBackPressed();
    }


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainSectionsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.toolbar);
        Optional.ofNullable(getSupportActionBar()).ifPresent(ActionBar::hide);

        binding.bottomNavigation.setOnNavigationItemSelectedListener(this);

        //navController = Navigation.findNavController(this, R.id.nav_host_main_sections);

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.profileFragment, R.id.dataAccessFragment, R.id.calendarFragment, R.id.contactsFragment)
                .build();

        //TODO: move to init method
        WebSettings webSettings = binding.webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setDomStorageEnabled(true);
        // webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        binding.webView.setWebViewClient(new DefaultWebClient());
        binding.webView.loadUrl(UrlConstants.WEB_VIEW_URL);
        //binding.webView.addJavascriptInterface(new DefaultWebInterface(this),"Android");



       /* NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController);*/
    }
}