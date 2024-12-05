export const COLORS = {
    primary: '#4A90E2',
    secondary: '#F5A623',
    background: '#F8F9FA',
    white: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    border: '#E1E1E1',
    error: '#FF3B30',
    success: '#4CD964',
    inactive: '#C7C7CC'
  };
  
  export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40
  };
  
  export const FONTS = {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  };
  
  export const globalStyles = {
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: SPACING.md
    },
    input: {
      backgroundColor: COLORS.white,
      padding: SPACING.md,
      borderRadius: 10,
      marginBottom: SPACING.md,
      fontSize: FONTS.sizes.md,
      borderWidth: 1,
      borderColor: COLORS.border,
      color: COLORS.text
    },
    button: {
      backgroundColor: COLORS.primary,
      padding: SPACING.md,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: SPACING.md
    },
    buttonText: {
      color: COLORS.white,
      fontSize: FONTS.sizes.md,
      fontWeight: FONTS.weights.bold
    },
    title: {
      fontSize: FONTS.sizes.xxl,
      fontWeight: FONTS.weights.bold,
      color: COLORS.text,
      textAlign: 'center',
      marginVertical: SPACING.lg
    },
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: SPACING.md,
      marginBottom: SPACING.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    }
  };