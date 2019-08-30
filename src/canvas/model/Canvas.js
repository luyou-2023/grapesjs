import Backbone from 'backbone';
import Frame from './Frame';
import Frames from './Frames';

export default Backbone.Model.extend({
  defaults: {
    frame: '',
    frames: '',
    wrapper: '',
    rulers: false,
    zoom: 100,
    x: 0,
    y: 0
  },

  initialize(config = {}) {
    const { styles = [], scripts = [] } = config;
    const frame = new Frame();
    styles.forEach(style => frame.addLink(style));
    scripts.forEach(script => frame.addScript(script));
    this.set('frame', frame);
    this.set('frames', new Frames([frame]));
    this.listenTo(this, 'change:zoom', this.onZoomChange);
  },

  onZoomChange() {
    const zoom = this.get('zoom');
    zoom < 1 && this.set('zoom', 1);
  }
});
