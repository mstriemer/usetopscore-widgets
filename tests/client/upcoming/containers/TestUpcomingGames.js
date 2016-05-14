import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { games } from '../fixtures';
import UpcomingGames from 'upcoming/containers/UpcomingGames';


describe('<UpcomingGames />', () => {
  it('lists the games', () => {
    const root = findDOMNode(renderIntoDocument(<UpcomingGames games={games} />));
    const renderedGames = [...root.querySelectorAll('li')];
    assert.equal(renderedGames.length, 2, root.outerHTML);
    assert.deepEqual(
      renderedGames.map((g) => g.querySelector('.teams').textContent),
      ['Go Fish @ One Great City!', 'Deadliest Catch @ Team Top Gun']);
  });
});
