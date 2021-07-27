import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    error?: string | null;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    return res.status(200).json({ error: '' });

    // try {
    //   await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
    //     email_address: email,
    //     status: 'subscribed'
    //   });

    //   return res.status(201).json({ error: '' });
    // } catch (error) {
    //   return res.status(500).json({ error: error.message || error.toString() });
    // }
};
