package com.sc222.insidenet.ui.mainSections;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewTreeObserver.OnScrollChangedListener;
import android.webkit.CookieManager;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityMainSectionsBinding;
import com.sc222.insidenet.ui.webview.constants.UrlConstants;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainSectionsActivity extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener {
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        String urlToNavigate = UrlConstants.WEB_VIEW_URL + "/persons";

        //FIXME: refactor and move to UrlConstants + (somehow navigate inside react without full reloading)
        if (authenticatedUserId != null) {
            urlToNavigate = urlToNavigate + "/" + authenticatedUserId;
            switch (item.getItemId()) {
                case R.id.profileFragment:
                    urlToNavigate = urlToNavigate + "/profile";
                    break;
                case R.id.dataAccessFragment:
                    urlToNavigate = urlToNavigate + "/slack-channels";
                    break;
                case R.id.calendarFragment:
                    urlToNavigate = urlToNavigate + "/calendar";
                    break;
                case R.id.contactsFragment:
                    urlToNavigate = urlToNavigate + "/contacts";
                    break;
            }
        }

        if (!binding.webView.getUrl().equals(urlToNavigate)) {
            Log.e("main", "navigate to: " + urlToNavigate);
            binding.webView.loadUrl(urlToNavigate);
        }
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

    //FIXME: website crashes on some emulators (try connecting to production build + setting up better babel)

    private class DefaultWebClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            if (UrlConstants.WEB_VIEW_URL.equals(request.getUrl().getHost())) {
                // This is my website, so do not override; let my WebView load the page
                return false;
            }

            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
            startActivity(intent);
            return true;
        }

        @Override
        public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
            super.doUpdateVisitedHistory(view, url, isReload);
            toggleBottomNavVisibilityByUrl(url);
            updateAuthenticatedUserId(url);
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            binding.pageLoadingIndicator.show();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            binding.pageLoadingIndicator.hide();
            binding.swipeToRefreshLayout.setRefreshing(false); // finish refresh
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            String errorMessage = "Unexpected error";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                errorMessage = error.getDescription().toString();
            }
            Log.e("main", errorMessage);

            binding.swipeToRefreshLayout.setRefreshing(false); // finish refresh in case of error
            //Your code to do
            //Toast.makeText(getApplicationContext(), errorMessage, Toast.LENGTH_LONG).show();
        }
    }


    private ActivityMainSectionsBinding binding;

    private String authenticatedUserId = null;

    private final OnScrollChangedListener onScrollChangedListener = new OnScrollChangedListener() {
        @Override
        public void onScrollChanged() {
            binding.swipeToRefreshLayout.setEnabled(Math.abs(binding.webView.getScrollY()) <= 0.1 );
        }
    };

    @Override
    public void onBackPressed() {
        //FIXME: finish only from profile page, in other  case -> go back
        this.finishAffinity();
        /*
        if (Objects.requireNonNull(navController.getCurrentDestination()).getId() == R.id.profileFragment){super.onBackPressed();}
        else {super.onBackPressed();}
         */
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

        //TODO: move to init webview method
        WebSettings webSettings = binding.webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setDomStorageEnabled(true);
        // webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        binding.webView.setWebViewClient(new DefaultWebClient());
        binding.webView.loadUrl(UrlConstants.WEB_VIEW_URL);
        //binding.webView.addJavascriptInterface(new DefaultWebInterface(this),"Android");

        //TODO: move to init swipeToRefresh method
        binding.swipeToRefreshLayout.setOnRefreshListener(
                () -> binding.webView.reload()
        );




       /* NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController);*/
    }


    @Override
    protected void onStart() {
        super.onStart();
        binding.swipeToRefreshLayout.getViewTreeObserver().addOnScrollChangedListener(onScrollChangedListener);
    }

    @Override
    protected void onStop() {
        super.onStop();
        binding.swipeToRefreshLayout.getViewTreeObserver().removeOnScrollChangedListener(onScrollChangedListener);
    }

    private void updateAuthenticatedUserId(String url) {
        //TODO: use regexp here
        if (url.endsWith("login")) {
            // reset previously authenticated user
            authenticatedUserId = null;
            Log.e("auth", "reset auth");
        } else if (url.contains("persons")) {
            if (authenticatedUserId == null) {
                // set authenticated user cookies
                authenticatedUserId = CookieManager.getInstance().getCookie(url);
                String cookies = CookieManager.getInstance().getCookie(url);
                Pattern pattern = Pattern.compile("personId=([a-zA-Z0-9\\-]+);?");
                Matcher matcher = pattern.matcher(cookies);
                if (matcher.find()) {
                    String foundId = matcher.group(1);
                    Optional.ofNullable(foundId).ifPresent(val -> authenticatedUserId = foundId);
                }
                Log.e("auth", "set id: " + authenticatedUserId);
            }
        }
    }


    private void toggleBottomNavVisibilityByUrl(String url) {
        //TODO: use regexp here
        if (url.endsWith("login")) {
            binding.bottomNavigation.setVisibility(View.GONE);
        } else if (url.contains("persons")) {
            binding.bottomNavigation.setVisibility(View.VISIBLE);
        } else {
            binding.bottomNavigation.setVisibility(View.GONE);
        }
    }
}