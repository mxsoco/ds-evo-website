import React, { useEffect, useRef, useState } from "react";
import { GoabText, GoabIconButton, GoabBlock } from '@abgov/react-components';
import { useMenu } from '../contexts/MenuContext';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  const { isMobile, setMenuOpen } = useMenu();
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) {
      setIsSticky(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isMobile]);

  return (
    <>

      <div
        ref={headerRef}
        className={`page-header ${isMobile && isSticky ? 'page-header--sticky' : ''}`}
      >
        <div className="page-header__content">
          <div className="page-header__title-container">
            {isMobile && (
              <GoabIconButton
                icon="menu"
                variant="dark"
                onClick={() => setMenuOpen(true)}
                ariaLabel="Open menu"
              />
            )}
            <a href="/" className="home-icon" role="menuitem" data-testid="url">
              <img alt="GoA Logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'%3E%3Crect width='31.695' height='31.688' x='.028' fill='%2300B6ED' rx='4'/%3E%3Cg clip-path='url(%23a)'%3E%3Cmask id='b' width='47' height='39' x='-11' y='-2' maskUnits='userSpaceOnUse' style='mask-type:alpha'%3E%3Cpath fill='%23545860' d='M22.017 31.103a63.47 63.47 0 0 1-7.22-3.164 52.41 52.41 0 0 0 6.195-2.724 43.148 43.148 0 0 0 1.023 5.89m13.27-24.392c-1.034-.13-.497.348-.785 1.7-1.246 5.832-6.05 10.035-10.873 12.855-.506-6.678-.3-14.093.967-18.636 1.069-3.836 2.34-3.132.763-3.938-1.66-.848-3.44.273-4.882 3.13C19.033 4.68 12.393 20.19 1.78 30.664c-5.43 5.36-10.34 2.6-11.323 1.775-.8-.67-1.096.365-.103 1.426 4.39 4.7 10.805 2.003 13.141-.314 6.455-6.405 13.96-20.193 16.996-26.044a89.89 89.89 0 0 0 .243 15.294 44.69 44.69 0 0 1-7.619 2.885c-1.504.391-2.435 1-2.462 1.691-.03.758.98 1.397 2.44 2.085 2.6 1.226 10.216 4.798 12.093 5.878 1.606.925 2.39.204 2.866-.796.622-1.302-1.083-2.054-2.735-2.545a50.47 50.47 0 0 1-1.48-8.385c3.87-2.365 7.682-5.52 9.88-9.452a18.004 18.004 0 0 0 1.568-4.365c.23-.934.293-1.9.186-2.855 0 0-.03-.209-.186-.229'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Crect width='31.695' height='31.695' x='.028' fill='%23fff' rx='3.048'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='32' height='31.992' y='.008' fill='%23fff' rx='4'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"/>
              <GoabText
                size="body-xs"
                mt="none"
                mb="none"
              >
                {title}
              </GoabText>
            </a>
          </div>
          {actions && (
            isMobile ? (
              <GoabBlock gap="s" direction="row">
                {actions}
              </GoabBlock>
            ) : (
              <div className="page-header__actions">{actions}</div>
            )
          )}
        </div>
      </div>
      {/* Sentinel element to detect when header should become sticky */}
      {isMobile && <div ref={sentinelRef} className="page-header-sentinel" />}

      {/* Spacer to prevent content jump when header becomes sticky */}
      {isMobile && isSticky && headerRef.current && (
        <div style={{ height: headerRef.current.offsetHeight }} />
      )}
    </>
  );
}