import { GetServerSidePropsContext } from "next";

/**
 * Check if context is client-side rendered
 * @function isCsr
 * @param {GetServerSidePropsContext} context 
 * @returns {boolean} true if context is client-side rendered
 */
export const isCsr = ({ req }: GetServerSidePropsContext): boolean => {
	const isCSR = !req || (req.url && req.url.startsWith("/_next/data"));

	return !!isCSR;
};