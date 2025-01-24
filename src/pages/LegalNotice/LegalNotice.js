import React from 'react';
// Components

// Style 
import './LegalNotice.css';

export default function LegalNotice() {
  return (
    <div>
      <div className='workspace'>
        <h1>Legal notice</h1>
        <div className='section'>
          <h2>Imprint</h2>
          <ul>
            <li>Name</li>
            <li>Address</li>
            <li>Postcode & City</li>
            <li>E-mail</li>
          </ul>
        </div>
        <div className='section'>
          <h2>Acceptance of terms</h2>
          <p>By accessing and using Kanban App, you acknowledge and agree to the following terms and conditions, 
            and any policies, guidelines, or amendments thereto that may be presented to you from time to time. 
            We, the listed students, may update or change the terms and conditions from time to time without notice.</p>
        </div>
        <div className='section'>
          <h2>Acceptance of terms</h2>
          <p>Join has been developed as part of a student group project in a web development bootcamp at the Developer Akademie GmbH. 
            It has an educational purpose and is not intended for extensive personal & business usage. 
            As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.
            The design of Join is owned by the Developer Akademie GmbH. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.</p>
        </div>
        <div className='section'>
          <h2>Proprietary rights</h2>
          <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students, retain all proprietary rights in Join, 
            including any associated copyrighted material, trademarks, and other proprietary information.</p>
        </div>
        <div className='section'>
          <h2>Use of the product</h2>
          <p>Join is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. 
            Any use of Join for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. 
            You are solely responsible for your interactions with other users of Join.</p>
        </div>
        <div className='section'>
          <h2>Disclaimer of warranties and limitation of liability</h2>
          <p>Join is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. 
            In no event will we, the listed students, or the Developer Akademie, be liable for any direct, indirect, incidental, special, consequential or exemplary damages, 
            including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, 
            arising out of or in connection with the use or performance of Join.</p>
        </div>
        <div className='section'>
          <h2>Indemnity</h2>
          <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and our affiliates, partners, officers, directors, agents, and employees, 
            from and against any claim, demand, loss, damage, cost, or liability including reasonable legal fees arising out of or relating to your use of Join and/or your breach of this Legal Notice. 
            For any questions or notices, please contact us at Contact Email. Date: January 24, 2025</p>
        </div>
      </div>
    </div>
  )
}
