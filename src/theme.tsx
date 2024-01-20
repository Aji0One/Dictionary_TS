export interface ColorTokens {
  [key: number | string | number]: string;
}

export interface ThemeTokens {
  grey: ColorTokens;
  primary: ColorTokens;
  secondary: ColorTokens;
}

export const tokensDark: ThemeTokens = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    50: "#ff0000",
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

function reverseTokens(tokensDark: ThemeTokens): ThemeTokens {
  const reversedTokens: ThemeTokens = {
    grey: { ...tokensDark.grey },
    primary: { ...tokensDark.primary },
    secondary: { ...tokensDark.secondary },
  };

  Object.entries(tokensDark).forEach(([key, val]) => {
    const reversedObj: ColorTokens = {};
    Object.keys(val).forEach((k) => {
      reversedObj[parseInt(k, 10)] = val[parseInt(k, 10)];
    });
    reversedTokens[key as keyof ThemeTokens] = reversedObj;
  });

  return reversedTokens;
}

export const tokensLight: ThemeTokens = reverseTokens(tokensDark);

export interface ThemeSettings {
  palette: {
    mode: "dark" | "light";
    primary: ColorTokens;
    secondary: ColorTokens;
    neutral: ColorTokens;
    background: {
      default: string;
      alter: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}

export const themeSettings = (mode: "dark" | "light"): ThemeSettings => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            ...tokensDark.primary,
            main: tokensDark.primary[400],
            light: tokensDark.primary[400],
          },
          secondary: {
            ...tokensDark.secondary,
            main: tokensDark.secondary[300],
          },
          neutral: {
            ...tokensDark.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.primary[600],
            alter: tokensDark.primary[500],
          },
        }
        : {
          primary: {
            ...tokensLight.primary,
            main: tokensDark.grey[50],
            light: tokensDark.grey[100],
          },
          secondary: {
            ...tokensLight.secondary,
            main: tokensDark.secondary[600],
            light: tokensDark.secondary[700],
          },
          neutral: {
            ...tokensLight.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.grey[0],
            alter: tokensDark.grey[50],
          },
        }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
