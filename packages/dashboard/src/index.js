// Allows webpack to first import all the deps inside bootstrap before
// executing them. Prevents bug when a deps is executed before being available.
import('./bootstrap')
