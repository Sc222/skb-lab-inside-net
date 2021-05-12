package com.sc222.insidenet.exampledata;

/**
 * A generic class that holds a result success w/ data or an error exception.
 */
public class ExampleResult<T> {
    // hide the private constructor to limit subclass types (Success, Error)
    private ExampleResult() {
    }

    @Override
    public String toString() {
        if (this instanceof ExampleResult.Success) {
            ExampleResult.Success success = (ExampleResult.Success) this;
            return "Success[data=" + success.getData().toString() + "]";
        } else if (this instanceof ExampleResult.Error) {
            ExampleResult.Error error = (ExampleResult.Error) this;
            return "Error[exception=" + error.getError().toString() + "]";
        }
        return "";
    }

    // Success sub-class
    public final static class Success<T> extends ExampleResult {
        private T data;

        public Success(T data) {
            this.data = data;
        }

        public T getData() {
            return this.data;
        }
    }

    // Error sub-class
    public final static class Error extends ExampleResult {
        private Exception error;

        public Error(Exception error) {
            this.error = error;
        }

        public Exception getError() {
            return this.error;
        }
    }
}