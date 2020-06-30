<?php

namespace Google\Site_Kit\Modules\Analytics\Shirshu\Measurement_Events;

/**
 * Subclass that contains information for WPForms plugin
 *
 * @class WPForms_Event_List
 */
class WPForms_Event_List extends Measurement_Event_List {

	public function __construct() {
		$builder = Measurement_Event::create_builder([
			'pluginName' => 'WPForms',
			'category' => 'engagement',
			'action' => 'form_submit',
			'selector' => '.wpforms-submit-container button',
			'on' => 'click'
		]);
		$this->add_event($builder->build());
	}

}
