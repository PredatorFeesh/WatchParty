import React from 'react';
import { shallow } from 'enzyme';

import ActivityFeed from '../ActivityFeed';

describe("renders", () => {
  const container = shallow(<ActivityFeed />);
  it('has landing', () => {
    expect(container.find('.Landing').length).toEqual(1);
  });
});
