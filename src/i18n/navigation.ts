import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/**
 * Internationalized navigation APIs
 * Wrappers around Next.js navigation APIs that automatically handle locale prefixes
 */
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
