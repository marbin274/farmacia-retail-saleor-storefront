import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbsProps } from './types';

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

import { useMediaQuery } from 'react-responsive';

describe('<Breadcrumbs />', () => {
  let props: BreadcrumbsProps;

  const setMediaQueryMock = (value = true) =>
    (useMediaQuery as any).mockImplementation(() => value);

  beforeEach(() => {
    setMediaQueryMock();
    props = {
      breadcrumbs: [
        { link: '/', label: 'Breadcrumb 1' },
        { link: '/', label: 'Breadcrumb 2' },
      ],
    };
  });
  it('renders content', () => {
    render(<Breadcrumbs {...props} />);

    const breadcrumbs = screen.getByRole('breadcrumbs');

    expect(breadcrumbs).toBeTruthy();
    const breadcrumbsHomeIcon = screen.getByTestId('breadcrumb-home-icon');
    expect(breadcrumbsHomeIcon).toBeTruthy();
  });

  it('renders home label Desktop', () => {
    props.showBaseLabel = true;
    render(<Breadcrumbs {...props} />);

    const breadcrumbsLabel = screen.getByRole('breadcrumb-home-label');
    expect(breadcrumbsLabel).toBeTruthy();
    expect(breadcrumbsLabel.className).toContain(
      'fa-font-normal fa-leading-6 fa-ml-2 fa-text-neutral-darkest fa-text-sm'
    );
  });

  it('renders own home icon Desktop', () => {
    props.homeIcon = <div role="breadcrumb-own-icon" />;
    render(<Breadcrumbs {...props} />);

    const breadcrumbsOwnHomeIcon = screen.getByRole('breadcrumb-own-icon');
    expect(breadcrumbsOwnHomeIcon).toBeTruthy();
  });

  it('renders mobile breadcrumbs: 2 breadcrumbs', () => {
    setMediaQueryMock(false);
    render(<Breadcrumbs {...props} />);

    const breadcrumbsMobile = screen.getByRole('breadcrumbs-mobile');
    expect(breadcrumbsMobile).toBeTruthy();
  });

  it('renders mobile breadcrumbs: 2 breadcrumbs', () => {
    setMediaQueryMock(false);
    render(<Breadcrumbs {...props} />);

    const breadcrumbsMobile = screen.getByRole('breadcrumbs-mobile');
    expect(breadcrumbsMobile).toBeTruthy();
    const downMobile = screen.getByRole('breadcrumb-mobile-down');
    expect(downMobile).toBeTruthy();
  });

  it('renders mobile breadcrumbs: 1 breadcrumb', () => {
    setMediaQueryMock(false);
    props.breadcrumbs = [{ link: '/', label: 'Breadcrumb' }];
    render(<Breadcrumbs {...props} />);

    const downMobile = screen.queryByRole('breadcrumb-mobile-down');
    expect(downMobile).toBeNull();
  });

  it('throw error zero breadcrumbs', () => {
    props.breadcrumbs = [];
    expect(() => render(<Breadcrumbs {...props} />)).toThrowError(
      'Breadcrumbs prop need at least 1 element'
    );
  });

  it('validate fire onClickOpen', () => {
    setMediaQueryMock(false);
    props.onClickOpen = jest.fn();
    render(<Breadcrumbs {...props} />);
    const downMobile = screen.getByRole('breadcrumb-mobile-down');
    fireEvent.click(downMobile);
    expect(props.onClickOpen).toHaveBeenCalledTimes(1);
  });
});
