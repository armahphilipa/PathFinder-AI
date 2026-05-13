/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportOptions {
  includeRecommendations: boolean;
  includeScholarships: boolean;
  includeInstitutions: boolean;
  userName: string;
}

export async function exportToPdf(containerId: string, options: ExportOptions) {
  const element = document.getElementById(containerId);
  if (!element) return;

  // We might want to temporarily hide some elements (like buttons) before taking the screenshot
  // but for now let's just grab the container.
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#F8F9FA' // Matches modern-bg
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`PathFinder_Roadmap_${options.userName.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('PDF Export failed:', error);
    throw error;
  }
}
