import React from 'react';

/**
 * Brand Button Component - Recreation from Figma Design
 * 
 * A beautiful, accessible button component that matches the exact design
 * specifications from your Figma CSI Dashboard.
 * 
 * @param {Object} props - Component props
 * @param {string} props.children - Button text content (default: "Label")
 * @param {boolean} props.showLeftIcon - Whether to show left icon
 * @param {boolean} props.showRightIcon - Whether to show right icon
 * @param {React.ReactNode} props.leftIcon - Custom left icon element
 * @param {React.ReactNode} props.rightIcon - Custom right icon element
 * @param {string} props.state - Button state: "default", "hover", "active", "disabled", "focus"
 * @param {function} props.onClick - Click handler function
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.className - Additional CSS classes
 */
const BrandButton = ({ 
  children = "Label",
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon = null,
  rightIcon = null,
  state = "default",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles = {
    // Core styling matching Figma design
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#066afe',
    color: 'white',
    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: '590', // Semibold
    fontSize: '14px',
    lineHeight: '19px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '9999px', // Fully rounded
    padding: '1px 16px', // py-px px-4 from Figma
    height: '32px', // h-8 from Figma
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    minWidth: 'fit-content',
    outline: 'none',
    
    // Disabled state
    ...(disabled && {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    }),
    
    // State-specific styles
    ...(state === 'hover' && !disabled && {
      backgroundColor: '#0556d6',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(6, 106, 254, 0.3)',
    }),
    
    ...(state === 'active' && !disabled && {
      backgroundColor: '#044bb8',
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(6, 106, 254, 0.3)',
    }),
    
    ...(state === 'focus' && !disabled && {
      boxShadow: '0 0 0 3px rgba(6, 106, 254, 0.2)',
    }),
  };

  const iconStyles = {
    width: '16px',
    height: '16px',
    fill: 'currentColor',
  };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.backgroundColor = '#0556d6';
      e.target.style.transform = 'translateY(-1px)';
      e.target.style.boxShadow = '0 4px 12px rgba(6, 106, 254, 0.3)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      e.target.style.backgroundColor = '#066afe';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled) {
      e.target.style.backgroundColor = '#044bb8';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 2px 6px rgba(6, 106, 254, 0.3)';
    }
  };

  const handleMouseUp = (e) => {
    if (!disabled) {
      e.target.style.backgroundColor = '#0556d6';
      e.target.style.transform = 'translateY(-1px)';
      e.target.style.boxShadow = '0 4px 12px rgba(6, 106, 254, 0.3)';
    }
  };

  const handleFocus = (e) => {
    if (!disabled) {
      e.target.style.boxShadow = '0 0 0 3px rgba(6, 106, 254, 0.2)';
    }
  };

  const handleBlur = (e) => {
    if (!disabled) {
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <button
      style={baseStyles}
      className={`brand-button ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : 'Brand button'}
      data-state={state}
      data-node-id="figma-brand-button" // Reference to Figma design
      {...props}
    >
      {/* Left Icon */}
      {showLeftIcon && leftIcon && (
        <span style={iconStyles} className="button-icon-left">
          {leftIcon}
        </span>
      )}
      
      {/* Button Text */}
      <span className="button-text">
        {children}
      </span>
      
      {/* Right Icon */}
      {showRightIcon && rightIcon && (
        <span style={iconStyles} className="button-icon-right">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

// Default export
export default BrandButton;

// Named exports for convenience
export { BrandButton };

// Example usage component
export const BrandButtonExample = () => {
  const ArrowIcon = () => (
    <svg viewBox="0 0 16 16" style={{ width: '16px', height: '16px' }}>
      <path d="M8 0L6.59 1.41L12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z" fill="currentColor"/>
    </svg>
  );

  const handleButtonClick = () => {
    alert('Button clicked! 🎉\n\nThis is your Figma design in React!');
  };

  return (
    <div style={{ 
      padding: '40px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      alignItems: 'center',
      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
        Brand Button Examples
      </h2>
      
      {/* Basic Button */}
      <BrandButton onClick={handleButtonClick}>
        Label
      </BrandButton>
      
      {/* Button with Left Icon */}
      <BrandButton 
        showLeftIcon={true} 
        leftIcon={<ArrowIcon />}
        onClick={handleButtonClick}
      >
        Action
      </BrandButton>
      
      {/* Custom Text */}
      <BrandButton onClick={handleButtonClick}>
        Get Started
      </BrandButton>
      
      {/* Disabled Button */}
      <BrandButton disabled={true}>
        Disabled
      </BrandButton>
    </div>
  );
};
