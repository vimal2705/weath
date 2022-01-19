
  // IntelliJ API Decompiler stub source generated from a class file
  // Implementation of methods is not available

  package com.haraxy.weather;

public final class String implements java.io.Serializable, java.lang.Comparable<java.lang.String>, java.lang.CharSequence {

    public String() { /* compiled code */ }

    public String(@androidx.annotation.NonNull java.lang.String original) { /* compiled code */ }

    public String(char[] value) { /* compiled code */ }

    public String(char[] value, int offset, int count) { /* compiled code */ }

    public String(int[] codePoints, int offset, int count) { /* compiled code */ }

    /**
     * @deprecated
     */
    @java.lang.Deprecated
    public String(byte[] ascii, int hibyte, int offset, int count) { /* compiled code */ }

    /**
     * @deprecated
     */
    @java.lang.Deprecated
    public String(byte[] ascii, int hibyte) { /* compiled code */ }

    public String(byte[] bytes, int offset, int length, @androidx.annotation.NonNull java.lang.String charsetName) throws java.io.UnsupportedEncodingException { /* compiled code */ }

    public String(byte[] bytes, int offset, int length, @androidx.annotation.NonNull java.nio.charset.Charset charset) { /* compiled code */ }

    public String(byte[] bytes, @androidx.annotation.NonNull java.lang.String charsetName) throws java.io.UnsupportedEncodingException { /* compiled code */ }

    public String(byte[] bytes, @androidx.annotation.NonNull java.nio.charset.Charset charset) { /* compiled code */ }

    public String(byte[] bytes, int offset, int length) { /* compiled code */ }

    public String(byte[] bytes) { /* compiled code */ }

    public String(@androidx.annotation.NonNull java.lang.StringBuffer buffer) { /* compiled code */ }

    public String(@androidx.annotation.NonNull java.lang.StringBuilder builder) { /* compiled code */ }

    public int length() { /* compiled code */ }

    public boolean isEmpty() { /* compiled code */ }

    public native char charAt(int i);

    public int codePointAt(int index) { /* compiled code */ }

    public int codePointBefore(int index) { /* compiled code */ }

    public int codePointCount(int beginIndex, int endIndex) { /* compiled code */ }

    public int offsetByCodePoints(int index, int codePointOffset) { /* compiled code */ }

    public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin) { /* compiled code */ }

    /**
     * @deprecated
     */
    @java.lang.Deprecated
    public void getBytes(int srcBegin, int srcEnd, byte[] dst, int dstBegin) { /* compiled code */ }

    public byte[] getBytes(@androidx.annotation.NonNull java.lang.String charsetName) throws java.io.UnsupportedEncodingException { /* compiled code */ }

    public byte[] getBytes(@androidx.annotation.NonNull java.nio.charset.Charset charset) { /* compiled code */ }

    public byte[] getBytes() { /* compiled code */ }

    public boolean equals(@androidx.annotation.NonNull java.lang.Object anObject) { /* compiled code */ }

    public boolean contentEquals(@androidx.annotation.NonNull java.lang.StringBuffer sb) { /* compiled code */ }

    public boolean contentEquals(@androidx.annotation.NonNull java.lang.CharSequence cs) { /* compiled code */ }

    public boolean equalsIgnoreCase(@androidx.annotation.NonNull java.lang.String anotherString) { /* compiled code */ }

    public native int compareTo(@androidx.annotation.NonNull java.lang.String s);

    public int compareToIgnoreCase(@androidx.annotation.NonNull java.lang.String str) { /* compiled code */ }

    public boolean regionMatches(int toffset, @androidx.annotation.NonNull java.lang.String other, int ooffset, int len) { /* compiled code */ }

    public boolean regionMatches(boolean ignoreCase, int toffset, @androidx.annotation.NonNull java.lang.String other, int ooffset, int len) { /* compiled code */ }

    public boolean startsWith(@androidx.annotation.NonNull java.lang.String prefix, int toffset) { /* compiled code */ }

    public boolean startsWith(@androidx.annotation.NonNull java.lang.String prefix) { /* compiled code */ }

    public boolean endsWith(@androidx.annotation.NonNull java.lang.String suffix) { /* compiled code */ }

    public int hashCode() { /* compiled code */ }

    public int indexOf(int ch) { /* compiled code */ }

    public int indexOf(int ch, int fromIndex) { /* compiled code */ }

    public int lastIndexOf(int ch) { /* compiled code */ }

    public int lastIndexOf(int ch, int fromIndex) { /* compiled code */ }

    public int indexOf(@androidx.annotation.NonNull java.lang.String str) { /* compiled code */ }

    public int indexOf(@androidx.annotation.NonNull java.lang.String str, int fromIndex) { /* compiled code */ }

    public int lastIndexOf(@androidx.annotation.NonNull java.lang.String str) { /* compiled code */ }

    public int lastIndexOf(@androidx.annotation.NonNull java.lang.String str, int fromIndex) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String substring(int beginIndex) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String substring(int beginIndex, int endIndex) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.CharSequence subSequence(int beginIndex, int endIndex) { /* compiled code */ }

    @androidx.annotation.NonNull
    public native java.lang.String concat(@androidx.annotation.NonNull java.lang.String s);

    @androidx.annotation.NonNull
    public java.lang.String replace(char oldChar, char newChar) { /* compiled code */ }

    public boolean matches(@androidx.annotation.NonNull java.lang.String regex) { /* compiled code */ }

    public boolean contains(@androidx.annotation.NonNull java.lang.CharSequence s) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String replaceFirst(@androidx.annotation.NonNull java.lang.String regex, @androidx.annotation.NonNull java.lang.String replacement) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String replaceAll(@androidx.annotation.NonNull java.lang.String regex, @androidx.annotation.NonNull java.lang.String replacement) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String replace(@androidx.annotation.NonNull java.lang.CharSequence target, @androidx.annotation.NonNull java.lang.CharSequence replacement) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String[] split(@androidx.annotation.NonNull java.lang.String regex, int limit) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String[] split(@androidx.annotation.NonNull java.lang.String regex) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String join(@androidx.annotation.NonNull java.lang.CharSequence delimiter, @androidx.annotation.NonNull java.lang.CharSequence... elements) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String join(@androidx.annotation.NonNull java.lang.CharSequence delimiter, @androidx.annotation.NonNull java.lang.Iterable<? extends java.lang.CharSequence> elements) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String toLowerCase(@androidx.annotation.NonNull java.util.Locale locale) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String toLowerCase() { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String toUpperCase(@androidx.annotation.NonNull java.util.Locale locale) { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String toUpperCase() { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String trim() { /* compiled code */ }

    @androidx.annotation.NonNull
    public java.lang.String toString() { /* compiled code */ }

    public native char[] toCharArray();

    @androidx.annotation.NonNull
    public static java.lang.String format(@androidx.annotation.NonNull java.lang.String format, @androidx.annotation.NonNull java.lang.Object... args) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String format(@androidx.annotation.NonNull java.util.Locale l, @androidx.annotation.NonNull java.lang.String format, @androidx.annotation.NonNull java.lang.Object... args) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(@androidx.annotation.NonNull java.lang.Object obj) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(char[] data) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(char[] data, int offset, int count) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String copyValueOf(char[] data, int offset, int count) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String copyValueOf(char[] data) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(boolean b) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(char c) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(int i) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(long l) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(float f) { /* compiled code */ }

    @androidx.annotation.NonNull
    public static java.lang.String valueOf(double d) { /* compiled code */ }

    @androidx.annotation.NonNull
    public native java.lang.String intern();
}