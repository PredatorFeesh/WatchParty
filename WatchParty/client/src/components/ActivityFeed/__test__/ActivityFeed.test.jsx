import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ActivityFeed from '../ActivityFeed';

describe("renders", () => {
  const container = shallow(<ActivityFeed />);
  it("matches the snapshot", () => {
    const tree = renderer.create(<ActivityFeed />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has landing', () => {
    expect(container.find('.Landing').length).toEqual(1);
  });
});
