/*
 * Public API Surface of controls
 *
 * Anything exported here becomes importable by consuming apps,
 * e.g.  import { ChButton } from 'controls';
 * Anything NOT exported here stays internal to the library.
 */

// Buttons & actions
export * from './lib/button/button';

// Form controls
export * from './lib/forms/control-base';
export * from './lib/forms/form-field/form-field';
export * from './lib/forms/input/input';
export * from './lib/forms/textarea/textarea';
export * from './lib/forms/select/select';
export * from './lib/forms/checkbox/checkbox';
export * from './lib/forms/switch/switch';
export * from './lib/forms/radio-group/radio-group';
export * from './lib/forms/stepper/stepper';
export * from './lib/forms/otp/otp';
export * from './lib/forms/datepicker/datepicker';
export * from './lib/forms/multi-select/multi-select';
export * from './lib/forms/autocomplete/autocomplete';
export * from './lib/forms/file-upload/file-upload';

// Third-party-backed form controls (ch-ng-*). Require optional peer deps.
export * from './lib/forms-ng/datepicker/ng-datepicker';
export * from './lib/forms-ng/multi-select/ng-multi-select';
export * from './lib/forms-ng/autocomplete/ng-autocomplete';
export * from './lib/forms-ng/file-upload/ng-file-upload';

// Buttons & actions
export * from './lib/actions/icon-button/icon-button';
export * from './lib/actions/button-group/button-group';
export * from './lib/actions/link/link';

// Data display
export * from './lib/data/card/card';
export * from './lib/data/badge/badge';
export * from './lib/data/tag/tag';
export * from './lib/data/avatar/avatar';
export * from './lib/data/empty-state/empty-state';
export * from './lib/data/table/table';
export * from './lib/data/pagination/pagination';
export * from './lib/data/stat-card/stat-card';
export * from './lib/data/tooltip/tooltip';

// Feedback & overlays
export * from './lib/feedback/alert/alert';
export * from './lib/feedback/spinner/spinner';
export * from './lib/feedback/progress-bar/progress-bar';
export * from './lib/feedback/skeleton/skeleton';
export * from './lib/feedback/modal/modal';
export * from './lib/feedback/toast/toast.service';
export * from './lib/feedback/toast/toaster';

// Navigation
export * from './lib/nav/tabs/tab';
export * from './lib/nav/tabs/tabs';
export * from './lib/nav/accordion/accordion-item';
export * from './lib/nav/breadcrumbs/breadcrumbs';
export * from './lib/nav/dropdown/dropdown';
export * from './lib/nav/steps/steps';

// Layout & typography
export * from './lib/layout/divider/divider';
export * from './lib/layout/stack/stack';
export * from './lib/layout/page-header/page-header';
export * from './lib/layout/container/container';
export * from './lib/layout/auth-layout/auth-layout';
